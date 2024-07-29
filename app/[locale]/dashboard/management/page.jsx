import Link from 'next/link';

const dashboardItems = [
  { name: 'Create Post', path: `management/posts/new`, description: 'Create a new post' },
  { name: 'Posts', path: `management/posts`, description: 'View and manage posts' },
  { name: 'Categories', path: `management/categories`, description: 'Manage post categories' },
  { name: 'Users', path: `management/users`, description: 'Manage user accounts' },
  { name: 'Comments', path: `management/comments`, description: 'View and manage comments' },
];

export default function Page() {
  return (
    <div className="grid grid-cols-12 gap-4 py-4">
      <div className="col-span-8">
        <div className="grid grid-cols-2 gap-4">
          {dashboardItems.map(({ path, name, description }) => (
            <Link
              key={path}
              href={`${path}`}
              className="block w-full select-none space-y-1 rounded-md p-3 border leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">{name}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-4">
        test
      </div>
    </div>
  );
}