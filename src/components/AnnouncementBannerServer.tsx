import AnnouncementBanner from "@/components/AnnouncementBanner";

import {
  getActiveAnnouncement,
} from "@/lib/announcements-db";

export default async function AnnouncementBannerServer() {
  const announcement =
    await getActiveAnnouncement();

  if (!announcement) {
    return null;
  }

  return (
    <AnnouncementBanner
      announcement={announcement}
    />
  );
}
