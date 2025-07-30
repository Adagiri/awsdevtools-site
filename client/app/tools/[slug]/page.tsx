import { PublicToolPage } from '@/components/tools/PublicToolPage';

const tools = ['cost-optimizer', 'security-auditor'];

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool,
  }));
}

export default function ToolDetail({ params }: { params: { slug: string } }) {
  return <PublicToolPage slug={params.slug} />;
}