import Link from 'next/link';

export default function RedirectLink({
  text,
  page,
}: {
  text: "Don't have an account? " | 'Already have an account? ';
  page: 'in' | 'up';
}) {
  return (
    <Link className='self-start' href={`/sign-${page}`}>
      {text}
      <span className='font-bold text-purlue dark:text-purlue-dark'>
        {'Sign ' + page}
      </span>
    </Link>
  );
}
