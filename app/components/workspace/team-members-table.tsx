import type { TeamMember } from "@prisma/client";
import type { WithDateFields } from "~/modules/types";
import { tw } from "~/utils";
import { TeamMembersActionsDropdown } from "./actions-dropdown";
import { EmptyState } from "../list/empty-state";
import { ListItem } from "../list/list-item";
import { Button } from "../shared";
import { Table, Td, Th, Tr } from "../table";

export const TeamMembersTable = ({
  teamMembers,
}: {
  teamMembers: WithDateFields<TeamMember, string>[];
}) => {
  const hasItems = teamMembers.length > 0;
  return (
    <div className="mb-6 flex gap-16">
      <div className="w-1/4">
        <div className="text-text-sm font-medium text-gray-700">
          Non-registered members (NRM)
        </div>
        <p className="text-sm text-gray-600">
          Team members are part of your workspace but do not have an account.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div
          className={tw(
            "-mx-4 overflow-x-auto border border-gray-200  bg-white md:mx-0 md:rounded-[12px]"
          )}
        >
          {!hasItems ? (
            <EmptyState
              customContent={{
                title: "No team members on database",
                text: "What are you waiting for? Add your first team member now!",
                newButtonRoute: `add-member`,
                newButtonContent: "Add NRM",
              }}
              modelName={{
                singular: "team member",
                plural: "team members",
              }}
            />
          ) : (
            <>
              <Table>
                <thead>
                  <Tr>
                    <Th>
                      <div className=" text-md font-semibold text-gray-900">
                        Non-registered members
                      </div>
                      <div>
                        {teamMembers.length}{" "}
                        {teamMembers.length > 1 ? "items" : "item"}{" "}
                      </div>
                    </Th>
                    <Th className="hidden md:table-cell">
                      <Button variant="primary" to={`add-member`}>
                        <span className=" whitespace-nowrap">Add NRM</span>
                      </Button>
                    </Th>
                  </Tr>
                </thead>
                <tbody>
                  {teamMembers.map((item) => (
                    <ListItem item={item} key={item.id}>
                      <>
                        <Td className="w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-text-sm font-medium text-gray-900">
                              {item.name}
                            </span>
                          </div>
                        </Td>
                        <Td className="text-right">
                          {/* @ts-ignore */}
                          <TeamMembersActionsDropdown teamMember={item} />
                        </Td>
                      </>
                    </ListItem>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
