import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const score = searchParams.score ? Number(searchParams.score) : 0;
  const total = searchParams.total ? Number(searchParams.total) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-6xl font-bold text-blue-600">{score}</span>
            <span className="text-2xl text-gray-500">/{total}</span>
          </div>

          <Button asChild className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
            <Link href="/">Take Another Quiz</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
