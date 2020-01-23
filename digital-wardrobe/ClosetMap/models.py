from django.db import models

class Wardrobe(models.Model):
    name = models.CharField("Wardrobe name", max_length=255, default='')
    user = models.CharField("Owner", max_length=255, default='')
    image = models.ImageField(upload_to='images', blank=True, null=True)
    
    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField("Item name", max_length=255, default='')
    user = models.CharField("Owner", max_length=255, default='')
    wardrobe = models.CharField("Wardrobe", max_length=255, default='')
    image = models.ImageField(upload_to='images', blank=True, null=True)
    
    def __str__(self):
        return self.name

class ItemCategory(models.Model):
    category_id = models.CharField("Category", max_length=255, default='')
    item_id = models.CharField("Item", max_length=255, default='')
    user = models.CharField("User", max_length=255, null=True)

    def __str__(self):
        return self.category_id

class Category(models.Model):
    category = models.CharField("Category", max_length=255, default='')
    user = models.CharField("User", max_length=255, null=True)
    image = models.ImageField(upload_to='images', blank=True, null=True)

    def __str__(self):
        return self.category

class Outfit(models.Model):
    name = models.CharField("Outfit", max_length=255, default='')
    user = models.CharField("User", max_length=255, null=True)
    image = models.ImageField(upload_to='images', blank=True, null=True)

class OutfitItem(models.Model):
    name = models.CharField("Item", max_length=255, default='')
    outfit = models.CharField("Outfit", max_length=255, default='')
    user = models.CharField("User", max_length=255, null=True)

