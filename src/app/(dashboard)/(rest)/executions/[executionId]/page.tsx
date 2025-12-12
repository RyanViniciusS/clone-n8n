interface PageProps {
  params: {
    executionId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { executionId } = params;
  return <p> executionId : {executionId}</p>;
};

export default Page;
