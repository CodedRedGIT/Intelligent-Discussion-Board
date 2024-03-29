# Generated by Django 4.1.7 on 2023-04-02 20:08

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("qanow", "0007_alter_post_prompt_alter_post_title_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="member",
            name="classes",
        ),
        migrations.AddField(
            model_name="class",
            name="members",
            field=models.ManyToManyField(
                blank=True, related_name="members", to="qanow.member"
            ),
        ),
        migrations.AddField(
            model_name="class",
            name="owners",
            field=models.ManyToManyField(
                blank=True, related_name="owners", to="qanow.member"
            ),
        ),
        migrations.AddField(
            model_name="class",
            name="posts",
            field=models.ManyToManyField(
                blank=True, related_name="posts", to="qanow.post"
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="replies",
            field=models.ManyToManyField(
                blank=True, related_name="replies", to="qanow.reply"
            ),
        ),
    ]
