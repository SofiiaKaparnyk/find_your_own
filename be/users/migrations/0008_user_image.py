# Generated by Django 5.0.2 on 2024-02-26 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0007_alter_user_gender"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="profile_pics"),
        ),
    ]