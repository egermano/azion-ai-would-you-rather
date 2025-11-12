interface ProgressProps {
  current: number;
  total: number;
}

export default function Progress({ current, total }: ProgressProps) {
  return (
    <div className="mb-6 text-center">
      <span className="text-sm md:text-base font-medium text-text-dark dark:text-neutral opacity-60">
        {current} / {total}
      </span>
    </div>
  );
}
