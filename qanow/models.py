import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Class(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class_section = models.CharField(max_length=15)


class Member(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="member", null=True, blank=True)
    classes = models.ManyToManyField(Class)

    class MemberType(models.TextChoices):
        STUDENT = "STUDENT"
        TEACHER_ASSISTANT = "TA"
        INSTRUCTOR = "INSTRUCTOR"

    member_type = models.TextField(choices=MemberType.choices)

    def save(self, *args, **kwargs):
        self.member_type = self.member_type.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.id)


class Reply(models.Model):
    member_id = models.ForeignKey(
        Member, null=False, on_delete=models.DO_NOTHING)
    published_date = models.DateTimeField(default=timezone.now)
    prompt = models.CharField(max_length=256)
    upvotes = models.IntegerField(default=0)


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    member_id = models.ForeignKey(Member, null=False, on_delete=models.CASCADE)
    prompt = models.CharField(max_length=256)
    published_date = models.DateTimeField(default=timezone.now)
    upvotes = models.IntegerField(default=0)

    replies = models.ManyToManyField(Reply, blank=True)

    class Tags(models.TextChoices):
        SYLLABUS = "SYLLABUS"
        EXAM = "EXAM"
        HOMEWORK = "HW"
        MISC = "MISC"

    tag = models.TextField(choices=Tags.choices, null=True)
