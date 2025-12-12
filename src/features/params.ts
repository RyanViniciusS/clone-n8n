import { PAGINATION } from "@/config/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

export const workflowsParams = {
    page: parseAsInteger
        .withDefault(PAGINATION.DEFALT_PAGE)
        .withOptions({ clearOnDefault: true }),

    pageSize: parseAsInteger
        .withDefault(PAGINATION.DEFALT_PAGE_SIZE)
        .withOptions({ clearOnDefault: true }),

    search: parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true })
}