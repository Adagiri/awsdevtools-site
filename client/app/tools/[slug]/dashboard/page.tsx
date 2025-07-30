import { ToolDashboardPage } from '@/components/tools/ToolDashboardPage';

const tools = ['cost-optimizer', 'security-auditor'];

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool,
  }));
}

export default function ToolDashboard({ params }: { params: { slug: string } }) {
  return <ToolDashboardPage slug={params.slug} />;
}