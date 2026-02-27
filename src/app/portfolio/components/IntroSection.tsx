interface IntroSectionProps {
  introduction: string;
}

export default function IntroSection({ introduction }: IntroSectionProps) {
  return (
    <section className="mb-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">소개</h1>
      <p className="text-xl text-neutral-600 leading-relaxed whitespace-pre-line">
        {introduction}
      </p>
    </section>
  );
}