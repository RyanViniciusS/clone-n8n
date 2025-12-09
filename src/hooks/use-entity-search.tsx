import { Button } from "@/components/ui/button";
import { PAGINATION } from "@/config/constants";
import { useEffect, useState } from "react";

// HOOK DE BUSCA -------------------------------------------------------

interface UseEntitySearchProps<
  T extends {
    search: string;
    page: number;
  }
> {
  parms: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export function useEntitySearch<
  T extends {
    search: string;
    page: number;
  }
>({ parms, setParams, debounceMs = 500 }: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(parms.search);

  useEffect(() => {
    if (localSearch === "" && parms.search !== "") {
      setParams({
        ...parms,
        search: "",
        page: PAGINATION.DEFALT_PAGE,
      });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== parms.search)
        setParams({
          ...parms,
          search: localSearch,
          page: PAGINATION.DEFALT_PAGE,
        });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localSearch, parms, setParams, debounceMs]);

  useEffect(() => {
    setLocalSearch(parms.search);
  }, [parms.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
}

// PAGINAÇÃO -----------------------------------------------------------

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({ page, totalPages, onPageChange, disabled }: EntityPaginationProps) => {
  return (
    <div className="flex flex-col w-full gap-y-3 mt-6">
      
      {/* Texto "Page X of Y" */}
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      {/* Botões de navegação */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          disabled={page === 1 || disabled}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>

        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
