import DocumentButtonOptions from "@/components/document/ButtonOptions";

const Home = () => {
  return (
    <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0">
      <h1 className="text-4xl text-center mb-8">Tax Assistant</h1>

      <div className="mb-4">
        <h3 className="text-2xl mb-2">Wybierz deklarację</h3>
        <DocumentButtonOptions />
      </div>
      <div className="border w-full min-h-[490px] rounded-md p-4">
        <h3 className="text-2xl mb-2 text-center">Chat</h3>
      </div>
    </div>
  );
};

export default Home;
