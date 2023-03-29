# Generated by Django 4.1.7 on 2023-03-29 22:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("qanow", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Reply",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "published_date",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                ("prompt", models.CharField(max_length=256)),
                ("upvotes", models.IntegerField(default=0)),
                (
                    "member_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="qanow.member",
                    ),
                ),
            ],
        ),
        migrations.RemoveField(
            model_name="post",
            name="question_id",
        ),
        migrations.AddField(
            model_name="post",
            name="tag",
            field=models.TextField(
                choices=[
                    ("SYLLABUS", "Syllabus"),
                    ("EXAM", "Exam"),
                    ("HW", "Homework"),
                    ("MISC", "Misc"),
                ],
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="post",
            name="upvotes",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="post",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="member_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="qanow.member"
            ),
        ),
        migrations.DeleteModel(
            name="Question",
        ),
        migrations.AddField(
            model_name="reply",
            name="post_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to="qanow.post"
            ),
        ),
    ]
