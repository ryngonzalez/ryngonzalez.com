function Page({ params }: { params: { slug: string } }) {
  return <div>Talk post: {params.slug}</div>
}

export default Page
