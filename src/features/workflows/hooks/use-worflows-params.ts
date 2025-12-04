import { workflowsParams } from "@/features/params";
import { useQueryStates } from 'nuqs'


export const userWorkglowsParms = () => {
    return useQueryStates(workflowsParams)
}