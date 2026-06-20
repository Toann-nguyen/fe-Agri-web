'use client';

import { Pen } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormDrawer,
  Input,
  Label,
  Switch,
  Textarea,
} from '@/components/ui/form';
import { useUser } from '@/lib/auth';
import { canUpdateDiscussion } from '@/lib/authorization';

import { useDiscussion } from '../api/get-discussion';
import {
  updateDiscussionInputSchema,
  useUpdateDiscussion,
} from '../api/update-discussion';

type UpdateDiscussionProps = {
  discussionId: string;
};

export const UpdateDiscussion = ({ discussionId }: UpdateDiscussionProps) => {
  const discussionQuery = useDiscussion({ discussionId });
  const updateDiscussionMutation = useUpdateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Discussion Updated');
      },
    },
  });

  const user = useUser();

  if (!canUpdateDiscussion(user?.data)) {
    return null;
  }

  const discussion = discussionQuery.data?.data;

  return (
    <FormDrawer
      isDone={updateDiscussionMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Update Discussion
        </Button>
      }
      title="Update Discussion"
      submitButton={
        <Button
          form="update-discussion"
          type="submit"
          size="sm"
          isLoading={updateDiscussionMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-discussion"
        onSubmit={(values) => {
          updateDiscussionMutation.mutate({
            data: values,
            discussionId,
          });
        }}
        options={{
          defaultValues: {
            title: discussion?.title ?? '',
            body: discussion?.body ?? '',
            public: discussion?.public ?? true,
          },
        }}
        schema={updateDiscussionInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />
            <Textarea
              label="Body"
              error={formState.errors['body']}
              registration={register('body')}
            />
            <div className="flex items-center space-x-2">
              <Switch
                defaultChecked={discussion?.public}
                className={`${
                  discussion?.public ? 'bg-cyan-600' : 'bg-slate-600'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
                id="discussion-public"
                {...register('public')}
              />
              <Label htmlFor="discussion-public">Public</Label>
            </div>
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
