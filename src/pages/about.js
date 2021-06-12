import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return (
    <div>
      This page is WIP!
      <button onClick={() => router.push('/')}>prev page</button>
    </div>
  )
};
