# Generated by Django 4.1.7 on 2023-04-15 04:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("qanow", "0011_alter_textdata_embedding"),
    ]

    operations = [
        migrations.AlterField(
            model_name="reply",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
    ]
