import { PublicToolPage } from '@/components/tools/PublicToolPage';

const tools = ['cost-optimizer', 'security-auditor', 'performance-monitor'];

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool,
  }));
}

export default function PublicTool({ params }: { params: { slug: string } }) {
  return <PublicToolPage slug={params.slug} />;
}