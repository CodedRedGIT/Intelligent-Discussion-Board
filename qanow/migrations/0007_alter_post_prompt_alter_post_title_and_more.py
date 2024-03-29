# Generated by Django 4.1.7 on 2023-04-01 00:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("qanow", "0006_post_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="prompt",
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name="post",
            name="title",
            field=models.CharField(default="I have a question", max_length=256),
        ),
        migrations.AlterField(
            model_name="reply",
            name="prompt",
            field=models.CharField(max_length=2000),
        ),
    ]
