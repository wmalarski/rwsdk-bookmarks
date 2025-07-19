import { IconChevronRight } from "@intentui/icons";
import { type ComponentProps, useMemo, useRef } from "react";

import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselItem,
} from "@/components/carousel";
import { DescriptionList } from "@/components/description-list";
import { Link } from "@/components/link";
import { LinkButton } from "@/components/link-button";
import type { Tag } from "@/db";
import { useDateFormatter } from "@/lib/formatters";
import { getIsLink } from "@/lib/get-is-link";
import { link } from "@/lib/links";

import type { BookmarkWithTags } from "../server/functions";
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
      <Card.Header>
        <Card.Title>{bookmark.title}</Card.Title>
        {bookmark.text && <Card.Description>{bookmark.text}</Card.Description>}
      </Card.Header>
      <Card.Content>
        <BookmarkTagsList bookmark={bookmark} />
        <BookmarkPreview bookmark={bookmark} />
        {bookmark.title && <BookmarkLinks bookmark={bookmark} />}
        <BookmarkDescription bookmark={bookmark} />
      </Card.Content>
      <Card.Footer className="flex-wrap justify-end gap-2">
        <DeleteBookmarkForm bookmark={bookmark} />
        <CompleteDialog bookmark={bookmark} />
        <UpdateBookmarkDialog bookmark={bookmark} tags={tags} />
        <LinkButton
          href={link("/bookmarks/bookmark/:id", { id: bookmark.id })}
          onPress={onDetailsClick}
        >
          <IconChevronRight />
          Details
        </LinkButton>
      </Card.Footer>
    </Card>
  );
};

type BookmarkDescriptionProps = {
  bookmark: BookmarkWithTags;
};

const BookmarkDescription = ({ bookmark }: BookmarkDescriptionProps) => {
  const formatDate = useDateFormatter();

  return (
    <DescriptionList>
      {bookmark.text && (
        <>
          <DescriptionList.Term>Text</DescriptionList.Term>
          <GridLink bookmarkId={bookmark.id} href={bookmark.text} />
        </>
      )}
      {bookmark.url && (
        <>
          <DescriptionList.Term>Url</DescriptionList.Term>
          <GridLink bookmarkId={bookmark.id} href={bookmark.url} />
        </>
      )}
      {bookmark.createdAt && (
        <>
          <DescriptionList.Term>Created at</DescriptionList.Term>
          <DescriptionList.Details>
            {formatDate(bookmark.createdAt)}
          </DescriptionList.Details>
        </>
      )}
      {bookmark.done && (
        <>
          <DescriptionList.Term>Done at</DescriptionList.Term>
          <DescriptionList.Details>
            {bookmark.doneAt && formatDate(bookmark.doneAt)}
          </DescriptionList.Details>
          {bookmark.rate && (
            <>
              <DescriptionList.Term>Rate</DescriptionList.Term>
              <DescriptionList.Details>{bookmark.rate}</DescriptionList.Details>
            </>
          )}
          {bookmark.note && (
            <>
              <DescriptionList.Term>Note</DescriptionList.Term>
              <DescriptionList.Details>{bookmark.note}</DescriptionList.Details>
            </>
          )}
        </>
      )}
    </DescriptionList>
  );
};

type GridLinkProps = {
  bookmarkId: string;
  href: string | null;
};

const GridLink = ({ bookmarkId: _bookmarkId, href }: GridLinkProps) => {
  const isLink = href ? getIsLink(href) : false;

  // const history = useBookmarksHistory();

  const onPress = () => {
    // history().addToHistory(bookmarkId);
  };

  if (href && isLink) {
    return (
      <DescriptionList.Details>
        <Link href={href} onPress={onPress}>
          {href}
        </Link>
      </DescriptionList.Details>
    );
  }

  return <DescriptionList.Details>{href}</DescriptionList.Details>;
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

  const onPress = () => {
    // history().addToHistory(bookmark.id);
  };

  const commonProps: Partial<ComponentProps<typeof LinkButton>> = {
    intent: "outline",
    onPress,
    rel: "noopener noreferrer",
    target: "_blank",
  };

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      <li>
        <LinkButton
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ search_query: bookmark.title })}`}
        >
          Youtube
        </LinkButton>
      </li>
      <li>
        <LinkButton
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ q: bookmark.title })}`}
        >
          Google
        </LinkButton>
      </li>
      <li>
        <LinkButton
          {...commonProps}
          href={`https://open.spotify.com/search/${bookmark.title}`}
        >
          Spotify
        </LinkButton>
      </li>
    </ul>
  );
};
