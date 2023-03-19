interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FunctionComponent<SectionTitleProps> = (
  { title }: SectionTitleProps,
) => {
  return (
    <p class="text-left row-start-1 col-span-full pl-4">
      <span class="text-heading-3 font-semibold">{title}</span>
    </p>
  );
};

export default SectionTitle;
