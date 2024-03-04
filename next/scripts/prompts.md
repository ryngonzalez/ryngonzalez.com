# Convert existing blog image urls to new format:
```
update image urls in this markdown to use the path "/blog/images/[slug]/*" and replace "[slug]" with the current filename minus the md extension; then, replace * with the filename and extension of the image in the current text
```

# Convert notion title/date to frontmatter for mdx
```
convert to mdx frontmatter that matches this, don't use quotes, and skip empty fields, format date to standard mm/dd/yyyy format:
export type PostMetadata = {
  title: string;
  publishedDate: string;
  subtitle: string;
  image?: string;
  tags?: string
};
```