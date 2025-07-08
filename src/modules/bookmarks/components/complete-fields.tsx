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

export const CompleteFields = ({
  initialData,
  pending,
  result,
}: CompleteFieldsProps) => {
  const { t } = useI18n();

  return (
    <Fieldset>
      <FormError message={result?.error} />

      <FieldsetLabel>
        <Checkbox
          checked={initialData?.done}
          disabled={pending}
          name="done"
          {...getInvalidStateProps({
            errorMessageId: "title-error",
            isInvalid: !!result?.errors?.done,
          })}
        />
        {t("bookmarks.complete.done")}
      </FieldsetLabel>
      <FieldError id="done-error" message={result?.errors?.done} />

      <FieldsetLabel for="rate">{t("bookmarks.complete.rate")}</FieldsetLabel>
      <Input
        disabled={pending}
        id="rate"
        max={10}
        min={0}
        name="rate"
        placeholder={t("bookmarks.complete.rate")}
        step={0.1}
        type="number"
        value={initialData?.rate ?? 5}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "rate-error",
          isInvalid: !!result?.errors?.rate,
        })}
      />
      <FieldError id="text-error" message={result?.errors?.text} />

      <FieldsetLabel for="note">{t("bookmarks.complete.note")}</FieldsetLabel>
      <Input
        disabled={pending}
        id="note"
        name="note"
        placeholder={t("bookmarks.complete.note")}
        value={initialData?.note ?? ""}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "note-error",
          isInvalid: !!result?.errors?.note,
        })}
      />
      <FieldError id="url-note" message={result?.errors?.note} />
    </Fieldset>
  );
};
