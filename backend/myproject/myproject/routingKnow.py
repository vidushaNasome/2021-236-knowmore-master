class KNRouter(object):
    def db_for_read(self, model, **hints):
        "Point all operations on chinook models to 'chinookdb'"
        if model._meta.app_label == 'knowledgebase_add' or model._meta.app_label == 'search':
            return 'seconddatabase'
        return 'default'

    def db_for_write(self, model, **hints):
        "Point all operations on chinook models to 'chinookdb'"
        if model._meta.app_label == 'knowledgebase_add' or model._meta.app_label == 'search':
            return 'seconddatabase'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        "Allow any relation if a both models in chinook app"
        if (obj1._meta.app_label == 'knowledgebase_add' and obj2._meta.app_label == 'knowledgebase_add') or (obj1._meta.app_label == 'search' and obj2._meta.app_label == 'search'):
            return True
        # Allow if neither is chinook app
        elif 'knowledgebase_add' not in [obj1._meta.app_label, obj2._meta.app_label]:
            return True
        return False

    def allow_syncdb(self, db, model):
        if db == 'seconddatabase' or model._meta.app_label == "Knowledgebase_add" or model._meta.app_label == "search":
            return False  # we're not using syncdb on our legacy database
        else:  # but all other models/databases are fine
            return True