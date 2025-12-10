import { AlertTriangleIcon, Loader2, MoreVerticalIcon, PackageOpenIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled: boolean;
  isCreating: boolean;
} & (
  | { onNewClick: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNewClick?: never }
  | { onNewClick?: never; newButtonHref?: never }
);
export const EntityHeader = ({
  title,
  description,
  onNewClick,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
      </div>
      {onNewClick && !newButtonHref && (
        <Button disabled={isCreating || disabled} size="sm" onClick={onNewClick}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNewClick && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  search: React.ReactNode;
  pagination: React.ReactNode;
};

export const EntityConainer = ({ children, header, search, pagination }: EntityContainerProps) => {
  return (
    <div className=" p-4 md:px-10 md:py-6 h-full justify-between gap-x-4 ">
      <div className="mx-auto max-w-scren-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EntitySearch = ({ value, onChange, placeholder = "Search" }: EntitySearchProps) => {
  return (
    <div className=" relative ml-auto">
      <SearchIcon
        className="size-3.5 absolute left-3 top-1/2
      -translate-y-1/2 text-muted-foreground"
      />
      <Input
        className="max-w-[200px] bg-background shadow-none border-border pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface StateViewPorps {
  message?: string;
}

interface LoadingViewProps extends StateViewPorps {
  entity?: string;
}

export const LoadingView = ({ message }: LoadingViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2 className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface ErrorViewProps extends StateViewPorps {
  entity?: string;
}

export const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface EmptyViewProps extends StateViewPorps {
  onNew?: () => void;
}
export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className=" border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No workflows found</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && <Button onClick={onNew}>Add item</Button>}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({ items, renderItem, getKey, emptyView, className }: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {" "}
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

interface EntityConainerProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({ href, title, subtitle, image, actions, onRemove, isRemoving, className }: EntityConainerProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    if (onRemove) await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 transition-all hover:shadow-md border rounded-xl cursor-pointer flex items-center",
          isRemoving && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <CardContent className="flex w-full items-center justify-between gap-4 p-0">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {image && <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">{image}</div>}

            <div className="flex flex-col min-w-0">
              <CardTitle className="text-base font-semibold truncate">{title}</CardTitle>

              {subtitle && <CardDescription className="text-xs truncate">{subtitle}</CardDescription>}
            </div>
          </div>

          {/* RIGHT SIDE – ACTIONS */}
          {(actions || onRemove) && (
            <div className="flex items-center gap-2">
              {actions}

              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-muted" onClick={(e) => e.stopPropagation()}>
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleRemove}>
                      <TrashIcon className="size-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
