interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FunctionComponent<SectionTitleProps> = (
  { title }: SectionTitleProps,
) => {
  return (
    <h2 class="text-left row-start-1 col-span-full pl-4">
      <span class="text-heading-3 font-semibold">{title}</span>
    </h2>
  );
};

export default SectionTitle;
