interface PageProps {
  params: {
    workflowId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { workflowId } = params;
  return <p> workflowId : {workflowId}</p>;
};

export default Page;
