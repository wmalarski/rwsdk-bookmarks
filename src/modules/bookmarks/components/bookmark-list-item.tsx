import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import type { PropsWithChildren } from "react";
import { type ComponentProps, createMemo } from "solid-js";

import { Link } from "@/components/link";

import { useI18n } from "~/modules/common/contexts/i18n";
import { createIsLink } from "~/modules/common/utils/create-is-link";
import { createDateFormatter } from "~/modules/common/utils/formatters";
import { paths } from "~/modules/common/utils/paths";
import { Badge } from "~/ui/badge/badge";
import { Card, CardActions, CardBody } from "~/ui/card/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/ui/carousel/carousel";
import { ChevronRightIcon } from "~/ui/icons/chevron-right-icon";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import type { BookmarkWithTagsModel } from "../server";
import { CompleteDialog } from "./complete-dialog";
import { DeleteBookmarkForm } from "./delete-bookmark-form";
import { UpdateBookmarkDialog } from "./update-bookmark-dialog";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem = ({ bookmark }: BookmarkListItemProps) => {
  const { t } = useI18n();

  const formatDate = createDateFormatter();

  const history = useBookmarksHistory();

  const onDetailsClick = () => {
    history().addToHistory(bookmark.id);
  };

  return (
    <Card className="w-full" size="sm" variant="bordered">
      <CardBody>
        <BookmarkTagsList bookmark={bookmark} />
        <BookmarkPreview bookmark={bookmark} />
        {bookmark.title && <BookmarkLinks bookmark={bookmark} />}
        <div
          className="grid w-full gap-2 pb-4"
          style={{ "grid-template-columns": "minmax(0, 1fr) minmax(0, 3fr)" }}
        >
          <GridTitle>{t("bookmarks.item.title")}</GridTitle>
          <GridText>{bookmark.title}</GridText>
          <GridTitle>{t("bookmarks.item.text")}</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.text} />
          <GridTitle>{t("bookmarks.item.url")}</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.url} />
          <GridTitle>{t("bookmarks.item.createdAt")}</GridTitle>
          <GridText>{formatDate(bookmark.created_at)}</GridText>
          <GridTitle>{t("bookmarks.item.done")}</GridTitle>
          <GridText>{String(bookmark.done)}</GridText>
          {bookmark.done && (
            <>
              <GridTitle>{t("bookmarks.item.doneAt")}</GridTitle>
              <GridText>
                {bookmark.done_at && formatDate(bookmark.done_at)}
              </GridText>
              <GridTitle>{t("bookmarks.item.rate")}</GridTitle>
              <GridText>{bookmark.rate}</GridText>
              <GridTitle>{t("bookmarks.item.note")}</GridTitle>
              <GridText>{bookmark.note}</GridText>
            </>
          )}
        </div>
        <CardActions>
          <DeleteBookmarkForm bookmark={bookmark} />
          <CompleteDialog bookmark={bookmark} />
          <UpdateBookmarkDialog bookmark={bookmark} />
          <Link href={paths.bookmark(bookmark.id)} onClick={onDetailsClick}>
            <ChevronRightIcon className="size-4" />
            {t("bookmarks.item.details")}
          </Link>
        </CardActions>
      </CardBody>
    </Card>
  );
};

const GridTitle = ({ children }: PropsWithChildren) => {
  return <span className="font-semibold text-sm">{children}</span>;
};

const GridText = ({ children }: PropsWithChildren) => {
  return <span className="break-words">{children}</span>;
};

type GridLinkProps = {
  bookmarkId: number;
  href: string;
};

const GridLink = ({ bookmarkId, href }: GridLinkProps) => {
  const isLink = createIsLink(() => href);

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(bookmarkId);
  };

  if (isLink()) {
    return (
      <Link className="break-words" href={href} onClick={onClick}>
        {href}
      </Link>
    );
  }

  return <GridText>{href}</GridText>;
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkPreview = ({ bookmark }: BookmarkPreviewProps) => {
  const images = createMemo(() => {
    const array = bookmark.preview
      ?.split(";")
      .filter((image) => image.length > 0);
    const smallImages = array?.filter((path) => path.endsWith("-250.jpg"));

    if (smallImages && smallImages.length > 0) {
      return smallImages;
    }

    return array ?? [];
  });

  if (images().length <= 0) {
    return null;
  }

  return (
    <div className="relative mx-auto my-4 w-64">
      <Carousel>
        <CarouselContent>
          {images().map((image) => (
            <BookmarkPreviewImage
              image={image}
              key={image}
              title={bookmark.title}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

type BookmarkPreviewImageProps = {
  image: string;
  title: string;
};

const BookmarkPreviewImage = ({ image, title }: BookmarkPreviewImageProps) => {
  const { t } = useI18n();

  let el: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.1 });
  const visible = useVisibilityObserver(() => el);
  const shouldShow = createMemo<boolean>((previous) => previous || visible());

  return (
    <CarouselItem className="min-h-72" ref={el}>
      {shouldShow && (
        <img
          alt={t("bookmarks.item.preview", { preview: title })}
          className="h-64 text-base-300"
          height={250}
          loading="lazy"
          src={image}
          width={250}
        />
      )}
    </CarouselItem>
  );
};

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkTagsList = ({ bookmark }: BookmarkTagsListProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {bookmark.bookmarks_tags.map((bookmarkTag) => (
        <li key={bookmarkTag.id}>
          <Badge color="accent">{bookmarkTag.tags.name}</Badge>
        </li>
      ))}
    </ul>
  );
};

type BookmarkLinksProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkLinks = ({ bookmark }: BookmarkLinksProps) => {
  const { t } = useI18n();

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(bookmark.id);
  };

  const commonProps: Partial<ComponentProps<typeof Link>> = {
    color: "secondary",
    onClick,
    rel: "noopener noreferrer",
    size: "xs",
    target: "_blank",
  };

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ search_query: bookmark.title })}`}
        >
          {t("bookmarks.item.youtube")}
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ q: bookmark.title })}`}
        >
          {t("bookmarks.item.google")}
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://open.spotify.com/search/${bookmark.title}`}
        >
          {t("bookmarks.item.spotify")}
        </Link>
      </li>
    </ul>
  );
};
