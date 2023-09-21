export default function ProfilePage({ params }: { params: { slug: string } }) {
  console.log(params.slug);

  const userName = params.slug[0].replace("%40", "");
  const songTitle = params.slug[1];

  console.log(userName);

  return <div>해당 회원 프로필page</div>;
}
