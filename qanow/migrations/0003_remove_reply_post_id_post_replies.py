# Generated by Django 4.1.7 on 2023-03-29 22:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("qanow", "0002_reply_remove_post_question_id_post_tag_post_upvotes_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="reply",
            name="post_id",
        ),
        migrations.AddField(
            model_name="post",
            name="replies",
            field=models.ManyToManyField(to="qanow.reply"),
        ),
    ]
