import { IconChevronRight } from "@intentui/icons";
import {
  type ComponentProps,
  type PropsWithChildren,
  useMemo,
  useRef,
} from "react";

import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselItem,
} from "@/components/carousel";
import { Link } from "@/components/link";
import type { Tag } from "@/db";
import { useDateFormatter } from "@/lib/formatters";
import { getIsLink } from "@/lib/get-is-link";
import { link } from "@/lib/links";

import type { BookmarkWithTags } from "../server/db";
import { CompleteDialog } from "./complete-dialog";
import { DeleteBookmarkForm } from "./delete-bookmark-form";
import { UpdateBookmarkDialog } from "./update-bookmark-dialog";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTags;
  tags: Tag[];
};

export const BookmarkListItem = ({ bookmark, tags }: BookmarkListItemProps) => {
  const formatDate = useDateFormatter();

  // const history = useBookmarksHistory();

  const onDetailsClick = () => {
    // history().addToHistory(bookmark.id);
  };

  return (
    <Card className="w-full">
      <Card.Content>
        <BookmarkTagsList bookmark={bookmark} />
        <BookmarkPreview bookmark={bookmark} />
        {bookmark.title && <BookmarkLinks bookmark={bookmark} />}
        <div
          className="grid w-full gap-2 pb-4"
          style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 3fr)" }}
        >
          <GridTitle>Title</GridTitle>
          <GridText>{bookmark.title}</GridText>
          <GridTitle>Text</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.text} />
          <GridTitle>Url</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.url} />
          {bookmark.createdAt && (
            <>
              <GridTitle>Created at</GridTitle>
              <GridText>{formatDate(bookmark.createdAt)}</GridText>
            </>
          )}
          <GridTitle>Done</GridTitle>
          <GridText>{String(bookmark.done)}</GridText>
          {bookmark.done && (
            <>
              <GridTitle>Done at</GridTitle>
              <GridText>
                {bookmark.doneAt && formatDate(bookmark.doneAt)}
              </GridText>
              <GridTitle>Rate</GridTitle>
              <GridText>{bookmark.rate}</GridText>
              <GridTitle>Note</GridTitle>
              <GridText>{bookmark.note}</GridText>
            </>
          )}
        </div>
      </Card.Content>
      <Card.Footer>
        <DeleteBookmarkForm bookmark={bookmark} />
        <CompleteDialog bookmark={bookmark} />
        <UpdateBookmarkDialog bookmark={bookmark} tags={tags} />
        <Link
          href={link("/bookmarks/bookmark/:id", { id: bookmark.id })}
          onClick={onDetailsClick}
        >
          <IconChevronRight className="size-4" />
          Details
        </Link>
      </Card.Footer>
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
  bookmarkId: string;
  href: string | null;
};

const GridLink = ({ bookmarkId: _bookmarkId, href }: GridLinkProps) => {
  const isLink = href ? getIsLink(href) : false;

  // const history = useBookmarksHistory();

  const onClick = () => {
    // history().addToHistory(bookmarkId);
  };

  if (href && isLink) {
    return (
      <Link className="break-words" href={href} onClick={onClick}>
        {href}
      </Link>
    );
  }

  return <GridText>{href}</GridText>;
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTags;
};

const BookmarkPreview = ({ bookmark }: BookmarkPreviewProps) => {
  const images = useMemo(() => {
    const array = bookmark.preview
      ?.split(";")
      .filter((image) => image.length > 0);
    const smallImages = array?.filter((path) => path.endsWith("-250.jpg"));

    if (smallImages && smallImages.length > 0) {
      return smallImages;
    }

    return array ?? [];
  }, [bookmark.preview?.split]);

  if (images.length <= 0) {
    return null;
  }

  return (
    <div className="relative mx-auto my-4 w-64">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <BookmarkPreviewImage
              image={image}
              key={image}
              title={bookmark.title}
            />
          ))}
        </CarouselContent>
        <CarouselButton segment="next" />
        <CarouselButton segment="previous" />
      </Carousel>
    </div>
  );
};

type BookmarkPreviewImageProps = {
  image: string;
  title: string;
};

const BookmarkPreviewImage = ({ image, title }: BookmarkPreviewImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // const useVisibilityObserver = createVisibilityObserver({ threshold: 0.1 });
  // const visible = useVisibilityObserver(() => el);
  // const shouldShow = visible;
  // const shouldShow = createMemo<boolean>((previous) => previous || visible());

  return (
    <CarouselItem className="min-h-72" ref={ref}>
      <img
        alt={title}
        className="h-64 text-base-300"
        height={250}
        loading="lazy"
        src={image}
        width={250}
      />
    </CarouselItem>
  );
};

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTags;
};

const BookmarkTagsList = ({ bookmark }: BookmarkTagsListProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {bookmark.BookmarkTag.map((bookmarkTag) => (
        <li key={bookmarkTag.id}>
          <Badge color="accent">{bookmarkTag.tagId}</Badge>
        </li>
      ))}
    </ul>
  );
};

type BookmarkLinksProps = {
  bookmark: BookmarkWithTags;
};

const BookmarkLinks = ({ bookmark }: BookmarkLinksProps) => {
  // const history = useBookmarksHistory();

  const onClick = () => {
    // history().addToHistory(bookmark.id);
  };

  const commonProps: Partial<ComponentProps<typeof Link>> = {
    // color: "secondary",
    onClick,
    rel: "noopener noreferrer",
    // size: "xs",
    target: "_blank",
  };

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ search_query: bookmark.title })}`}
        >
          Youtube
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ q: bookmark.title })}`}
        >
          Google
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://open.spotify.com/search/${bookmark.title}`}
        >
          Spotify
        </Link>
      </li>
    </ul>
  );
};
