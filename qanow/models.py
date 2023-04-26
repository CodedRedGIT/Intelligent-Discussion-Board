import uuid

from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.db.models.signals import post_save
import openai


class Member(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="member", null=True, blank=True)

    class MemberType(models.TextChoices):
        STUDENT = "STUDENT"
        TEACHER_ASSISTANT = "TA"
        INSTRUCTOR = "INSTRUCTOR"

    member_type = models.TextField(choices=MemberType.choices, default=MemberType.INSTRUCTOR)

    def save(self, *args, **kwargs):
        self.member_type = self.member_type.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.id)

    def get_classes(self):
        return Class.objects.filter(members=self)
    
    
class File(models.Model):
    file = models.FileField(upload_to='post_files/')
    embedding = models.JSONField(null=True, blank=True)


class Reply(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member_id = models.ForeignKey(
        Member, null=False, on_delete=models.DO_NOTHING)
    published_date = models.DateTimeField(default=timezone.now)
    prompt = models.CharField(max_length=2000)
    upvotes = models.IntegerField(default=0)
    email = models.EmailField(default='', null=True, blank=True)
    parent_reply = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='child_replies')
    files = models.ManyToManyField('File', blank=True)

    def save(self, *args, **kwargs):
        self.email = self.member_id.user.email
        super().save(*args, **kwargs)


def embedding_create(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )

    vector = response['data'][0]['embedding']

    # print(len(vector))
    # print(vector)

    return vector


class TextData(models.Model):
    embedding = models.JSONField()


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member_id = models.ForeignKey(Member, null=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=256, default='I have a question')
    prompt = models.CharField(max_length=2000)
    published_date = models.DateTimeField(default=timezone.now)
    upvotes = models.IntegerField(default=0)
    files = models.ManyToManyField('File', blank=True)

    replies = models.ManyToManyField(Reply, blank=True, related_name='replies')

    class Tags(models.TextChoices):
        SYLLABUS = "SYLLABUS"
        EXAM = "EXAM"
        HOMEWORK = "HW"
        MISC = "MISC"

    tag = models.TextField(choices=Tags.choices, null=True, blank=True)
    textData = models.ForeignKey(
        TextData, on_delete=models.CASCADE, null=True)


@receiver(post_save, sender=Post)
def set_embedding(sender, instance, created, **kwargs):
    if created and not instance.textData:
        # Generate an embedding vector using the embeddingcreate function
        vector = embedding_create(instance.prompt)
        # Set the embedding foreign key on the Post instance
        instance.textData = TextData.objects.create(embedding=vector)
        instance.save()


class Class(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class_section = models.CharField(max_length=15)
    posts = models.ManyToManyField(Post, blank=True, related_name='posts')
    members = models.ManyToManyField(
        Member, blank=True, related_name='members')
    owners = models.ManyToManyField(Member, blank=True, related_name='owners')
    files = models.ManyToManyField('File', blank=True)
