'use client';

import { Plus } from 'lucide-react';
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
import { canCreateDiscussion } from '@/lib/authorization';

import {
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '../api/create-discussion';

export const CreateDiscussion = () => {
  const createDiscussionMutation = useCreateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Discussion Created');
      },
    },
  });

  const user = useUser();

  if (!canCreateDiscussion(user?.data)) {
    return null;
  }

  return (
    <FormDrawer
      isDone={createDiscussionMutation.isSuccess}
      triggerButton={
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create Discussion
        </Button>
      }
      title="Create Discussion"
      submitButton={
        <Button
          form="create-discussion"
          type="submit"
          size="sm"
          isLoading={createDiscussionMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="create-discussion"
        onSubmit={(values) => {
          createDiscussionMutation.mutate({ data: values });
        }}
        schema={createDiscussionInputSchema}
        options={{
          defaultValues: {
            title: '',
            body: '',
            public: true,
          },
        }}
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
                defaultChecked
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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
