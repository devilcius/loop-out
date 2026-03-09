type RichTextProps = {
  html: string
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function RichText({ html, className, as = 'p' }: RichTextProps) {
  const Tag = as

  // This renderer is only for trusted local copy (i18n/content), not user input.
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
