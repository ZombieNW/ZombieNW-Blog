<script>
	let { post } = $props();
</script>

<!-- Meta Tags -->
<title>{post.title}</title>
<meta name="description" content={post.description} />

<!-- Mental Illness -->
<link rel="canonical" href="https://blog.zombienw.com/posts/{post.slug}" />
<meta property="og:type" content="article" />
<meta property="og:title" content={post.title} />
<meta property="og:description" content={post.description} />
<meta property="og:url" content="https://blog.zombienw.com/posts/{post.slug}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={post.title} />
<meta name="twitter:description" content={post.description} />
