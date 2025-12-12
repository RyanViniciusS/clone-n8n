

interface PageProps {
  params: {
    credentialid: string;
  };
}

const Page = async ({ params }: PageProps) => {

  const { credentialid } = params;
  return <p> credentialid : {credentialid}</p>;
};

export default Page;
