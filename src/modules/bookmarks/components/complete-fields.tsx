import type { Component } from "solid-js";

import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { Checkbox } from "~/ui/checkbox/checkbox";
import { FieldError } from "~/ui/field-error/field-error";
import { Fieldset, FieldsetLabel } from "~/ui/fieldset/fieldset";
import { FormError } from "~/ui/form-error/form-error";
import { Input } from "~/ui/input/input";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";
import type { BookmarkWithTagsModel } from "../server";

type CompleteFieldsProps = {
  initialData?: BookmarkWithTagsModel;
  pending?: boolean;
  result?: RpcFailure;
};

export const CompleteFields: Component<CompleteFieldsProps> = (props) => {
  const { t } = useI18n();

  return (
    <Fieldset>
      <FormError message={props.result?.error} />

      <FieldsetLabel>
        <Checkbox
          checked={props.initialData?.done}
          disabled={props.pending}
          name="done"
          {...getInvalidStateProps({
            errorMessageId: "title-error",
            isInvalid: !!props.result?.errors?.done,
          })}
        />
        {t("bookmarks.complete.done")}
      </FieldsetLabel>
      <FieldError id="done-error" message={props.result?.errors?.done} />

      <FieldsetLabel for="rate">{t("bookmarks.complete.rate")}</FieldsetLabel>
      <Input
        disabled={props.pending}
        id="rate"
        max={10}
        min={0}
        name="rate"
        placeholder={t("bookmarks.complete.rate")}
        step={0.1}
        type="number"
        value={props.initialData?.rate ?? 5}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "rate-error",
          isInvalid: !!props.result?.errors?.rate,
        })}
      />
      <FieldError id="text-error" message={props.result?.errors?.text} />

      <FieldsetLabel for="note">{t("bookmarks.complete.note")}</FieldsetLabel>
      <Input
        disabled={props.pending}
        id="note"
        name="note"
        placeholder={t("bookmarks.complete.note")}
        value={props.initialData?.note ?? ""}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "note-error",
          isInvalid: !!props.result?.errors?.note,
        })}
      />
      <FieldError id="url-note" message={props.result?.errors?.note} />
    </Fieldset>
  );
};
