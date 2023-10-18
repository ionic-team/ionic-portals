export type Release = {
  body: string;
  name: string;
  published_at: string;
  tag_name: string;
  type: string;
  version: string;
};

export type GithubRelease = {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: any;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
  mentions_count: number;
};
