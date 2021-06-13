import { useRouter } from 'next/router';

export const aboutPage = () => {
  const router = useRouter();
  return (
    <div>
      This page is WIP!
      <button onClick={() => router.push('/')}>prev page</button>
    </div>
  )
};

export default aboutPage;
