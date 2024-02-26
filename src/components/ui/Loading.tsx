export default function Loading({ size }: { size?: number }) {
  return (
    <div
      className='animate-spin rounded-full border-[6px] border-slate-100 border-r-purlue'
      style={{ width: `${size || 48}px`, height: `${size || 48}px` }}
    />
  );
}
