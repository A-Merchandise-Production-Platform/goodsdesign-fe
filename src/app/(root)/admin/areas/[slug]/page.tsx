import AreaDetail from '../components/area-detail';

export default function AreaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <AreaDetail params={params} />;
}
