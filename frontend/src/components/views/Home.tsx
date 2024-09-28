import DocumentButtonOptions from "@/components/document/ButtonOptions";
import Chat from "@/components/chat";

const Home = () => {
  return (
    <div className="container mx-auto max-w-3xl w-full py-10 px-4 lg:px-0">
      <h1 className="text-4xl text-center mb-8">Tax Assistant</h1>

      <div className="mb-4">
        <h3 className="text-2xl mb-2">Wybierz deklarację</h3>
        <DocumentButtonOptions />
      </div>
      <Chat />
    </div>
  );
};

export default Home;
