import React from 'react';
import { Icons } from './Icons';

interface Executive {
    name: string;
    age: number;
    since: number;
    title: string;
}

const EXECUTIVES: Executive[] = [
    { name: 'Timothy D. Cook', age: 63, since: 2002, title: 'CEO & Director' },
    { name: 'Andrea Jung', age: 66, since: 2008, title: 'Independent Director' },
    { name: 'Ronald D. Sugar', age: 75, since: 2010, title: 'Independent Director' },
    { name: 'Susan Lynne Wagner', age: 63, since: 2014, title: 'Independent Director' },
    { name: 'Arthur D. Levinson', age: 74, since: 2000, title: 'Independent Non-Executive Chairman of the Board' },
    { name: 'Monica C. Lozano', age: 67, since: 2021, title: 'Independent Director' },
    { name: 'Wanda M. Austin', age: 70, since: 2024, title: 'Independent Director' },
    { name: 'Alex Gorsky', age: 64, since: 2021, title: 'Independent Director' },
];

const CompanyProfileView: React.FC = () => {
    return (
        <div className="space-y-8 text-[#131722] dark:text-[#d1d4dc]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e0e3eb] dark:border-[#2a2e39] pb-4">
                <h2 className="text-xl font-bold">Apple Inc Company Profile</h2>
                <Icons.Info className="w-5 h-5 text-[#2962ff] bg-[#2962ff]/10 p-0.5 rounded" />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-8 py-4 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                <div>
                    <div className="text-xs text-[#787b86] mb-1">Industry</div>
                    <div className="text-sm font-bold text-[#2962ff]">Computers, Phones & Household Electronics</div>
                </div>
                <div className="border-l border-[#e0e3eb] dark:border-[#2a2e39] pl-8">
                    <div className="text-xs text-[#787b86] mb-1">Sector</div>
                    <div className="text-sm font-bold text-[#2962ff]">Technology</div>
                </div>
                <div className="border-l border-[#e0e3eb] dark:border-[#2a2e39] pl-8">
                    <div className="text-xs text-[#787b86] mb-1">Employees</div>
                    <div className="text-sm font-bold">166000</div>
                </div>
                <div className="border-l border-[#e0e3eb] dark:border-[#2a2e39] pl-8">
                    <div className="text-xs text-[#787b86] mb-1">Equity Type</div>
                    <div className="text-sm font-bold">ORD</div>
                </div>
            </div>

            {/* Description */}
            <div className="text-sm text-[#131722] dark:text-[#d1d4dc] leading-relaxed border-b border-[#e0e3eb] dark:border-[#2a2e39] pb-8">
                <p>
                    Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.
                    The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets;
                    and wearables, home, and accessories comprising AirPods, Apple Vision Pro, Apple TV, Apple Watch, Beats products, and HomePod.
                    It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers
                    to discover and download applications. In addition, the company offers various subscription-based services, such as Apple Arcade,
                    Apple Fitness+, Apple Music, Apple News+, and Apple TV+. The company serves consumers, and small and mid-sized businesses; and
                    the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store.
                    The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network
                    carriers and resellers. The company was formerly known as Apple Computer, Inc. and changed its name to Apple Inc. in January 2007.
                    Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.
                </p>
            </div>

            {/* Contact Information */}
            <div>
                <h3 className="text-base font-bold mb-4">Contact Information</h3>
                <div className="grid grid-cols-[auto_1fr] gap-x-12 gap-y-4 text-sm border-b border-[#e0e3eb] dark:border-[#2a2e39] pb-8">
                    <div className="flex gap-2 text-[#787b86]">
                        <Icons.MapPin className="w-4 h-4" /> Address
                    </div>
                    <div className="text-right">
                        <div>One Apple Park Way</div>
                        <div>Cupertino, 95014</div>
                        <div>United States</div>
                    </div>

                    <div className="flex gap-2 text-[#787b86] border-t border-[#e0e3eb] dark:border-[#2a2e39] pt-4 w-full col-span-2"></div>

                    <div className="flex gap-2 text-[#787b86]">
                        <Icons.Phone className="w-4 h-4" /> Phone
                    </div>
                    <div className="text-right">(408) 996-1010</div>

                    <div className="flex gap-2 text-[#787b86] border-t border-[#e0e3eb] dark:border-[#2a2e39] pt-4 w-full col-span-2"></div>

                    <div className="flex gap-2 text-[#787b86]">
                        <Icons.Printer className="w-4 h-4" /> Fax
                    </div>
                    <div className="text-right">-</div>

                    <div className="flex gap-2 text-[#787b86] border-t border-[#e0e3eb] dark:border-[#2a2e39] pt-4 w-full col-span-2"></div>

                    <div className="flex gap-2 text-[#787b86]">
                        <Icons.Globe className="w-4 h-4" /> Web
                    </div>
                    <div className="text-right text-[#2962ff] hover:underline cursor-pointer">www.apple.com</div>
                </div>
            </div>

            {/* Top Executives */}
            <div>
                <h3 className="text-base font-bold mb-4">Top Executives</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b border-[#e0e3eb] dark:border-[#2a2e39]">
                                <th className="py-2 font-bold text-[#787b86]">Name</th>
                                <th className="py-2 font-bold text-[#787b86] text-center">Age</th>
                                <th className="py-2 font-bold text-[#787b86] text-center">Since</th>
                                <th className="py-2 font-bold text-[#787b86]">Title</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39]">
                            {EXECUTIVES.map((exec, i) => (
                                <tr key={i} className="hover:bg-[#f8f9fd] dark:hover:bg-[#2a2e39]/50">
                                    <td className="py-3 font-bold text-[#131722] dark:text-[#d1d4dc]">{exec.name}</td>
                                    <td className="py-3 text-center text-[#131722] dark:text-[#d1d4dc]">{exec.age}</td>
                                    <td className="py-3 text-center text-[#131722] dark:text-[#d1d4dc]">{exec.since}</td>
                                    <td className="py-3 text-[#131722] dark:text-[#d1d4dc]">{exec.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfileView;
