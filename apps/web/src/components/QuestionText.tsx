interface QuestionTextProps {
  text: string;
}

export default function QuestionText({ text }: QuestionTextProps) {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark dark:text-text-light text-center leading-tight max-w-2xl">
      {text}
    </h1>
  );
}
