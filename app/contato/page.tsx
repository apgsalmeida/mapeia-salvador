import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function ContatoPage() {
  return (
    <BackgroundWrapper type="internal">
      <div className="max-w-2xl mx-auto my-10 p-6 md:p-10 bg-white/85 rounded-xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2d5a27] uppercase mb-6">
          Fale com o Mapeia Bahia
        </h1>
        <br></br>
        <h2 className="text-wrap">Para informações, sugestões, parcerias ou feedbacks.</h2>
        <br></br>
        <h2 className="font-bold">E-mail para contato: <a className="underline" href="mailto:mapeiabahia@gmail.com">mapeiabahia@gmail.com</a></h2>
      </div>
    </BackgroundWrapper>
  );
}
