import { ToolSettingsPage } from '@/components/tools/ToolSettingsPage';

const tools = ['cost-optimizer', 'security-auditor'];

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool,
  }));
}

export default function ToolSettings({ params }: { params: { slug: string } }) {
  return <ToolSettingsPage slug={params.slug} />;
}