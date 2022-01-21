import { DocbasePost } from "../docbaseTypes";

export const isPost = (post: unknown): post is DocbasePost => {
  const maybePost = post as DocbasePost;
  return (
    maybePost.id !== undefined &&
    maybePost.title !== undefined &&
    maybePost.body !== undefined &&
    maybePost.draft !== undefined &&
    maybePost.archived !== undefined &&
    maybePost.url !== undefined &&
    maybePost.created_at !== undefined &&
    maybePost.updated_at !== undefined &&
    maybePost.tags !== undefined &&
    maybePost.scope !== undefined &&
    maybePost.sharing_url !== undefined &&
    maybePost.representative_image_url !== undefined &&
    maybePost.user !== undefined &&
    maybePost.stars_count !== undefined &&
    maybePost.good_jobs_count !== undefined &&
    maybePost.comments !== undefined &&
    maybePost.groups !== undefined &&
    maybePost.attachments !== undefined
  );
};
