import { GetStaticProps, GetStaticPaths  } from 'next';
import { useRouter } from 'next/router';

export default function Weather() {
    const router = useRouter();
    const location = router.query.location as string;
    return (
        <div>{location}</div>
    )
}

interface locationProps {
    location: string;
}