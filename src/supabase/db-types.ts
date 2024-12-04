export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      entry: {
        Row: {
          content: Json | null;
          created_at: string | null;
          description: string | null;
          id: string;
          journal_id: string | null;
          media: Json | null;
          pinned: boolean | null;
          title: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: Json | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          journal_id?: string | null;
          media?: Json | null;
          pinned?: boolean | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: Json | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          journal_id?: string | null;
          media?: Json | null;
          pinned?: boolean | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "entry_journal_id_fkey";
            columns: ["journal_id"];
            isOneToOne: false;
            referencedRelation: "journal";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "entry_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      journal: {
        Row: {
          best_streak: number | null;
          categories: Json | null;
          cover_image: string | null;
          created_at: string;
          current_streak: number | null;
          description: string | null;
          id: string;
          last_read: string | null;
          slug: string | null;
          stats: Json | null;
          title: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          best_streak?: number | null;
          categories?: Json | null;
          cover_image?: string | null;
          created_at?: string;
          current_streak?: number | null;
          description?: string | null;
          id?: string;
          last_read?: string | null;
          slug?: string | null;
          stats?: Json | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          best_streak?: number | null;
          categories?: Json | null;
          cover_image?: string | null;
          created_at?: string;
          current_streak?: number | null;
          description?: string | null;
          id?: string;
          last_read?: string | null;
          slug?: string | null;
          stats?: Json | null;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "journal_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      profile: {
        Row: {
          avatar: string | null;
          created_at: string;
          dob: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          plan: string | null;
          username: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          dob?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          plan?: string | null;
          username?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          dob?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          plan?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      project: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          editable: boolean | null;
          id: string;
          is_public: boolean | null;
          members: MemberType[] | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          editable?: boolean | null;
          id?: string;
          is_public?: boolean | null;
          members?: MemberType[] | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          editable?: boolean | null;
          id?: string;
          is_public?: boolean | null;
          members?: MemberType[] | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      task: {
        Row: {
          assigned_to: string[] | null;
          completed: boolean | null;
          completed_at: string | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          end_date: string | null;
          id: string;
          name: string | null;
          priority: string | null;
          project_id: string | null;
          start_date: string | null;
          status: string | null;
          task_id: string | null;
        };
        Insert: {
          assigned_to?: string[] | null;
          completed?: boolean | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          name?: string | null;
          priority?: string | null;
          project_id?: string | null;
          start_date?: string | null;
          status?: string | null;
          task_id?: string | null;
        };
        Update: {
          assigned_to?: string[] | null;
          completed?: boolean | null;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          name?: string | null;
          priority?: string | null;
          project_id?: string | null;
          start_date?: string | null;
          status?: string | null;
          task_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "task_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "task_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "project";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export type EntryType = Tables<"entry">;
export type JournalType = Tables<"journal">;
export type ProfileType = Tables<"profile">;
export type ProjectType = Tables<"project">;
export type TaskType = Tables<"task">;
export type MemberType = {
  id: string;
  email: string;
  accepted: boolean;
  name: string;
};
